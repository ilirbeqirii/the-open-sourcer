/** @jsxImportSource @emotion/react */

type NoResultProps = {
  query: string;
};

function NoResult(props: NoResultProps) {
  return (
    <div css={{ marginTop: 40, fontSize: "1.2em", textAlign: "center" }}>
      <p css={{ color: "red" }}>
        Hmmm... I couldn't find any user with the query "{props.query}."
        <br /> Please try another.
      </p>
    </div>
  );
}

export { NoResult };
