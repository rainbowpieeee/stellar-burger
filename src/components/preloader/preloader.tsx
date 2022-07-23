import loaderStyles from './preloader.module.css'

export function Preloader() {
  return (
    <div className={loaderStyles.loaderConteiner}>
      <div className={loaderStyles.lds_ripple}><div></div><div></div></div>
    </div>
  )
}
