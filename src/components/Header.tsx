import '../styles/sidebar.scss'

type PropsHeader = {
    title: string;
  };
  
  export function Header(props: PropsHeader) {
    return (
      <>
        <header>
          <span className="category">
            Categoria:<span>{props.title}</span>
          </span>
        </header>
      </>
    );
  }
  