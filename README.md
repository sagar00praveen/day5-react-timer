
chllange:

Challenge 1: Debug the Effect
function BrokenComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count]);

  return <div>Count: {count}</div>;
}
Question: What's wrong with this code? What will happen when it runs? How would you fix it?


answer:
inside the effect, you update the same state (count) with setCount(count + 1).

Every time count changes, the effect runs again.

useEffect(() => {
  const timer = setTimeout(() => {
    setCount(prev => prev + 1);
  }, 1000);

  return () => clearTimeout(timer);
}, []);
