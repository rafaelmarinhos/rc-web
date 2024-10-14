import {
  Pagination as DefaultPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  onNext: (page: number) => void
  onPrevious: (page: number) => void
  onLast: (page: number) => void
  onFirst: (page: number) => void
  totalPages: number
  page: number
  tableRef?: React.RefObject<HTMLTableElement>
  loading?: boolean
}

export const Pagination = (props: Props) => {
  const {
    onNext,
    onPrevious,
    onLast,
    onFirst,
    totalPages = 0,
    page = 0,
  } = props

  const onNextClick = () => {
    if (page < totalPages) {
      onNext(page + 1)
    }
  }

  const onPreviousClick = () => {
    if (page > 1) {
      onPrevious(page - 1)
    }
  }

  const onLastClick = () => {
    if (page < totalPages) {
      onLast(totalPages)
    }
  }

  const onFirstClick = () => {
    if (page > 1) {
      onFirst(1)
    }
  }

  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-2">
      <div>
        <span className="text-sm text-muted-foreground">
          {' '}
          {!props.loading && `${page} de ${totalPages}`}
        </span>
      </div>

      <div>
        <DefaultPagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled={page === 1} onClick={onFirstClick}>
                Primeira
              </PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                disabled={page === 1}
                onClick={onPreviousClick}
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                disabled={page === totalPages}
                onClick={onNextClick}
              >
                Próxima
              </PaginationNext>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                disabled={page === totalPages}
                onClick={onLastClick}
              >
                Última
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </DefaultPagination>
      </div>
    </div>
  )
}
