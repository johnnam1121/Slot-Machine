import Hyerim from '../public/assets/slotItems/Hyerim.jpg';
import Kevin from '../public/assets/slotItems/Kevin.jpg';
import Mina from '../public/assets/slotItems/Mina.jpg';

const SlotMachine = () => {
  // Define your initial slots
  const initialSlots = [
    { src: { Mina } },
    { src: { Kevin } },
    { src: { Hyerim } }
  ];

  // Initialize state with initialSlots
  const [slots, setSlots] = useState(initialSlots);
  const [rolling, setRolling] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      {slots.map((slot, index) => (
        <div key={index} className={`slot ${rolling ? 'rolling' : ''}`}>
          <img
            id={`slot${index}`}
            src={slot.src}
            alt={`slot-${index}`}
            style={{ width: '500px', height: '500px', objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
};
