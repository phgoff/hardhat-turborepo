import { Button } from "ui";
import { Token__factory } from "contract";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <p>Contract name: {JSON.stringify(Token__factory.name)}</p>
      <Button />
    </div>
  );
}
