import { HeaderInicio } from '../../components/inicio/header'
import ButtonsPages from '../../components/inicio/pages'
import CarteleraCultural from '../../components/inicio/cartelera'
import FooterInicio from '../../components/inicio/footerMain'
import Secretaria from '../../components/inicio/secretaria'
import Logos from '../../components/inicio/logos'

const Landing = () => {
  return (
    <div>
      <HeaderInicio />
      <Logos />
      <Secretaria />
      <CarteleraCultural />
      <ButtonsPages />
      <FooterInicio />
    </div>
  )
}

export default Landing