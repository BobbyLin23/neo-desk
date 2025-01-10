import { cn } from '@/lib/utils'

type IconProps = {
  name: string
} & React.ComponentPropsWithoutRef<'span'>

export const Icon = ({ name, className, ...props }: IconProps) => {
  return <span className={cn('iconify', name, className)} {...props} />
}
