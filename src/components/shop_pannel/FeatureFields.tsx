import { IProductFeature } from "../../core/interface/IProductFeature";

const FeatureFields: React.FC<{
  featureValues: Array<IProductFeature>;
  setFeatureValues: Function;
}> = ({ featureValues, setFeatureValues }) => {
  const handleAddPair = () => {
    setFeatureValues([...featureValues, { feature: "", value: "" }]);
  };

  const handleRemovePair = (index: number) => {
    const updatedPairs = featureValues.filter((_, i) => i !== index);
    setFeatureValues(updatedPairs);
  };

  const handleChangePair = (
    index: number,
    field: "feature" | "value",
    value: string
  ) => {
    const updatedPairs = featureValues.map((pair, i) => {
      if (i === index) {
        return { ...pair, [field]: value };
      }
      return pair;
    });
    setFeatureValues(updatedPairs);
  };

  return (
    <>
      {featureValues.map((pair, index) => (
        <div key={index} className="d-flex align-items-center">
          <input
            type="text"
            value={pair.feature}
            onChange={(e) => handleChangePair(index, "feature", e.target.value)}
            placeholder="feature"
            required
          />
          <input
            type="text"
            value={pair.value}
            onChange={(e) => handleChangePair(index, "value", e.target.value)}
            placeholder="value"
            required
          />
          {index !== 0 && ( // Conditionally render remove button for subsequent rows
            <button type="button" onClick={() => handleRemovePair(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddPair}>
        Add Feature-Value Pair
      </button>
    </>
  );
};

export default FeatureFields;
