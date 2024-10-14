import { Skeleton } from './skeleton'

const Container = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => (
  <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
    <h4 className="mb-8 text-xl font-bold text-black dark:text-white">
      {title}
    </h4>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {children}
    </div>
  </div>
)

interface Props {
  text: string
  value?: string | number
  showDivider?: boolean
  loading?: boolean
}
const Item = ({ text, value, showDivider = true, loading }: Props) => (
  <div
    className={`flex items-center justify-center border-b ${showDivider && 'border-r'} border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:pb-0`}
  >
    <div className="text-center">
      {loading ? (
        <Skeleton className={`mb-1.5 h-8 w-40 rounded-md`} />
      ) : (
        <h4 className="mb-1 text-3xl font-bold text-black dark:text-white md:text-title-lg">
          {value}
        </h4>
      )}
      <p className="text-sm font-medium text-muted-foreground">{text}</p>
    </div>
  </div>
)

export const DataStatistic = {
  Container,
  Item,
}
