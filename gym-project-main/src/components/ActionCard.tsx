import "./ActionCard.css";

interface Action {
  subtitle: string;
  title: string;
  onPressed: () => void;
}

const ActionCard = ({ action }: { action: Action }) => {
  return (
    <div className="action-card" onClick={action.onPressed}>
      <div></div>
      <div>
        <p>{action.subtitle}</p>
        <h2>{action.title}</h2>
      </div>
    </div>
  );
};

export default ActionCard;
