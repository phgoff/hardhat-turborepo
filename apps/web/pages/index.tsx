import { Button } from "ui";
import { Lock__factory } from "contract";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <p>Contract name: {JSON.stringify(Lock__factory.name)}</p>
      <Button />
    </div>
  );
}
