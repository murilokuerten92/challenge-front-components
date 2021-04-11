import { Button } from "./Button";
import "../styles/sidebar.scss";

interface GenreProps {
  id: string;
  iconName: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
  handleClickButton: (id: number) => void;
  selected: boolean;
}

export function SideBar(props: GenreProps) {
  return (
    <>
      <Button
        id={props.id}
        title={props.title}
        iconName={props.iconName}
        onClick={() => props.handleClickButton(Number(props.id))}
        selected={props.selected}
      />
    </>
  );
}
