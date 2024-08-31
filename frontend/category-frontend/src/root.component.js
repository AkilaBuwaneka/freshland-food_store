/*export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
}*/
import Category from './pages/Categories';

export default function Root(props) {
  return <div>
    <Category />
  </div>;
}
