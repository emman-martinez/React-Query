import { possibleStatus } from "../helpers/defaultData.js";

export function StatusSelect({ onChange, value }) {
  return (
    <select className="status-select" onChange={onChange} value={value}>
      <option value="">Select a status to filter</option>
      {possibleStatus.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
