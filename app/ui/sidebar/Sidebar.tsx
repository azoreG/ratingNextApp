import { Card } from './Card';

export default function Sidebar() {
  return (
    <div>
      <h3 className="text-sm font-medium">
        Select the cards in order to evaluate them
      </h3>

      <Card
        title="Beautiful View of Moraine Lake"
        image="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_900,q_75,w_1700/v1/clients/quintanaroo/_cc911e74-049d-4172-b8d9-67b8942c9bc0.1392201394-2910bf3f5b8388c632d75b47bd71a0c94b1389b5c0b1926331aa7ed225a20103-d_640.jpg"
        rate={5}
      />
    </div>
  );
}
