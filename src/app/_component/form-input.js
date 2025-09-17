export const FormInput = (props) => {
  const { error, value, errorMessage, name, handleChange, inputTag, type } =
    props;
  return (
    <div className="seperate">
      <div
        style={{ display: "flex", flexDirection: "column", paddingTop: "1px" }}
      >
        <p className="text3"> {inputTag}</p>
        <input
          className="input"
          type={type}
          name={name}
          placeholder="Placeholder"
          onChange={handleChange}
          value={value}
          style={{
            borderColor: error ? "red" : "#000000ff",
          }}
        />
        {error && (
          <div style={{ color: "red", paddingTop: "10px" }}>{error}</div>
        )}
      </div>
    </div>
  );
};
