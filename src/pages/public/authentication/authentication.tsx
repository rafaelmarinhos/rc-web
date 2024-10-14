import { useNavigate } from 'react-router-dom'

import { Eye } from '@/assets/eye'
import { LockedEye } from '@/assets/locked-eye'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthentication } from '@/hooks/useAuthentication'
import { ROUTES } from '@/routers/routes'

export const Authentication = () => {
  const { passwordType, onChangePasswordType, form } = useAuthentication()

  const navigate = useNavigate()

  const { register, formState } = form
  const { errors } = formState

  return (
    <Page className="w-full flex-col items-center pt-[14rem]">
      <form
        className="flex w-[26rem] flex-col"
        onSubmit={() => navigate(ROUTES.DASHBOARD)}
      >
        <span className="mb-10 text-3xl font-semibold text-black">Login</span>

        <Input
          id="email"
          label="Email"
          placeholder="Digite seu email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          containerClassName="mt-4"
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          type={passwordType}
          error={errors.password?.message}
          {...register('password')}
        >
          <button onClick={onChangePasswordType} className="pr-3">
            {passwordType === 'password' ? <LockedEye /> : <Eye />}
          </button>
        </Input>

        <Button className="mt-8 w-full" loading={formState.isSubmitting}>
          Entrar
        </Button>
      </form>
    </Page>
  )
}
