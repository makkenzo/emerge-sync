// import { useState } from 'react';

// interface FunctionModalProps {
//     onApplyFunction: (func: string, value: string) => void;
//     onCancel: () => void;
// }

// const FunctionModal: React.FC<FunctionModalProps> = ({ onApplyFunction, onCancel }) => {
//     const [selectedFunction, setSelectedFunction] = useState<string>('');
//     const [inputValue, setInputValue] = useState<string>('');

//     const applyFunction = () => {
//         onApplyFunction(selectedFunction, inputValue);
//         onCancel();
//     };

//     return (
//         <div className="modal">
//             <h2>Select a Function</h2>
//             <select onChange={(e) => setSelectedFunction(e.target.value)}>
//                 <option value="SUM">SUM</option>
//                 <option value="AVERAGE">AVERAGE</option>
//                 {/* Add more functions as needed */}
//             </select>
//             <input
//                 type="text"
//                 placeholder="Enter value"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//             />
//             <button onClick={applyFunction}>Apply</button>
//             <button onClick={onCancel}>Cancel</button>
//         </div>
//     );
// };

// export default FunctionModal;
