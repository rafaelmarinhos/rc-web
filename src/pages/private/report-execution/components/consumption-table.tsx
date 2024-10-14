import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReportExecution } from '@/interfaces/report'
import { cpfCnpjMask } from '@/utils/masks'

interface Props {
  data?: ReportExecution['executionEnergies']
}

export const ConsumptionTable = ({ data }: Props) => {
  return (
    <Table>
      {!data?.length && <TableCaption>Nenhum item encontrado</TableCaption>}
      <TableHeader className="sticky">
        <TableRow className="bg-muted">
          <TableHead className="w-20 text-left">Tipo</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Preço Unitário (R$)</TableHead>
          <TableHead className="text-right">Valor (R$)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-left">{item.type}</TableCell>
            <TableCell>{cpfCnpjMask(item.quantity)}</TableCell>
            <TableCell className="text-center">{item.unit}</TableCell>
            <TableCell className="text-center">{item.fee}</TableCell>
            <TableCell className="text-right">{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
