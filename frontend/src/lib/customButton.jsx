import clsx from "clsx";

function Button({text, onClick, iconSrc='', reverse=false, px='px-6', py='py-1.5', bg='bg-primary hover:bg-primary-hover active:bg-primary-active', textSize='text-base', textColor='text-text-secondary', iconSize='w-7 h-7'}){
  return (
    <div className={clsx("flex flex-row gap-2 items-center cursor-pointer rounded-lg transition-colors", bg, px, py)} onClick={onClick}>

      { !reverse && <Icon iconSrc={iconSrc}/> }

      <p className={clsx("select-none", textSize, textColor)}>{text}</p>

      { reverse && <Icon iconSrc={iconSrc}/> }

    </div>
  )
} 

function Icon({iconSrc}){
  return iconSrc !== '' ? (
    <div className="flex flex-col justify-center items-center">
      <img className={iconSize} src={iconSrc}/>
    </div>
  ) : (
    <></>
  )
}


export default Button;