import "./ActionCard.css";
import CallMadeIcon from "@mui/icons-material/CallMade";

interface Action {
  subtitle: string;
  title: string;
  onPressed: () => void;
}

const ActionCard = ({ action }: { action: Action }) => {
  return (
    <div className="action-card" onClick={action.onPressed}>
      <div></div>
      <div className="row">
        <div>
          <p>{action.subtitle}</p>
          <h2>{action.title}</h2>
        </div>
        <CallMadeIcon />
      </div>
    </div>
  );
};

export default ActionCard;
