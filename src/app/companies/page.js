import Header from "@/components/Header";
import Card from "@/components/Company_card";

const page = () => {
  return (
    // <div
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     fontSize: "1.5em",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     padding: "32px",
    //     fontWeight: "bold",
    //   }}
    // >
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    //</div>
  );
};

export default page;
