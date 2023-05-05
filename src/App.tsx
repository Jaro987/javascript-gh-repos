import { useEffect } from "react";
import Tabs from "./Tabs";

export default function App() {
  useEffect(()=> {
    document.title = "Abstract";
  })
  return (
    <div className="App">
      <Tabs tabsConfig={tabsConfig} defaultIndex={0} />
    </div>
  );
}

const tabsConfig = [
  {
    label: "Angular",
    icon: "😍"
  },
  {
    label: "React",
    icon: "🤓"
  },
  {
    label: "Vue",
    icon: "🤓"
  }
];
