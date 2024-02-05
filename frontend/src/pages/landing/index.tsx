import { HeaderInicio } from '../../components/inicio/header'
import ButtonsPages from '../../components/inicio/pages'
import CarteleraCultural from '../../components/inicio/cartelera'
import FooterInicio from '../../components/inicio/footerMain'
import Secretaria from '../../components/inicio/secretaria'

const Landing = () => {
  return (
    <div>
      <HeaderInicio />
      <ButtonsPages />
      <CarteleraCultural />
      <Secretaria />
      <FooterInicio />
    </div>
  )
}

export default Landing