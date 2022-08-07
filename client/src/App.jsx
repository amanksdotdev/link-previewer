import { Fragment, useState } from "react";
import { VscSearch, VscClose } from "react-icons/vsc";
import axios from "axios";
import { Card } from "./component/Card";
import { DummyCard } from "./component/DummyCard";
import isUrlValid from "url-validation";
import { Toast } from "./component/Toast";

const api = "https://linkpreviewrestapi.herokuapp.com/";

const INITIAL_TOAST_VALUE = {
  hidden: true,
  message: "",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState(INITIAL_TOAST_VALUE);

  const resetToast = (currentType) => {
    setToast({ ...INITIAL_TOAST_VALUE, type: currentType });
  };

  const handleButtonClick = async () => {
    if (!input) return;
    if (isUrlValid(input)) {
      setLoading(true);
      try {
        const { data } = await axios.get(`${api}?url=${input}`);
        setMetadata(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setToast({
          type: "error",
          message: "Error: metadata not found",
          hidden: false,
        });
        setMetadata(null);
        setTimeout(() => {
          setLoading(false);
          resetToast("error");
        }, 2500);
      }
    } else {
      setToast({ type: "warning", message: "Invalid URL 🥴", hidden: false });
      setTimeout(() => {
        resetToast("warning");
      }, 2500);
    }
  };

  return (
    <Fragment>
      <div className="App text-slate-900 pb-32">
        <div className="container mx-auto h-[95vh] w-11/12 mb-4 relative">
          <h1 className="text-3xl md:text-5xl font-semibold md:pt-10 pt-5 md:pl-5">
            🖇 Link <span className="text-red-500"> Previewer</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-3 md:mt-4 md:items-center py-4 md:pl-5">
            <div className="w-full md:w-[32rem] max-w-[100%] relative">
              <VscSearch className="absolute z-10 left-5 top-1/3 text-slate-500" />
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.trim());
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleButtonClick();
                  }
                }}
                className="placeholder:italic py-3 px-12 drop-shadow focus:drop-shadow-none outline-red-500 rounded-full border w-full accent-red-500 text-slate-500"
                type="text"
                placeholder="Example - https://www.findcoder.io/"
              />
              {input ? (
                <VscClose
                  onClick={() => {
                    setInput("");
                  }}
                  className="absolute z-10 right-5 top-1/3 text-slate-500 text-xl cursor-pointer"
                />
              ) : (
                ""
              )}
            </div>
            <button
              disabled={loading}
              onClick={handleButtonClick}
              className="px-3 py-2 bg-red-500 text-white hover:bg-red-700 duration-300 rounded disabled:bg-gray-500 disabled:text-gray-100"
            >
              Generate ⚙️
            </button>
          </div>
          <div className="md:p-5 relative">
            {loading ? <DummyCard /> : ""}{" "}
            {metadata && !loading ? (
              <Card
                img={metadata.image}
                link={metadata.url.slice(0, 60) + "..."}
                title={metadata.title}
                description={
                  metadata.description
                    ? metadata.description.slice(0, 100) + "..."
                    : "No description found"
                }
              />
            ) : (
              ""
            )}
          </div>
          <div className="hidden md:block bg-gray-100 py-4 px-8 rounded-lg max-w-[32rem] drop-shadow-sm absolute right-20 top-64">
            <h3 className="font-semibold text-xl">Instructions</h3>
            <ul>
              <li>
                - Please enter complete URL <br />{" "}
                <span className="ml-8 italic text-sm">
                  {" "}
                  https://www.google.com
                </span>{" "}
                ✅ <br />
                <span className="ml-8 italic text-sm">
                  {" "}
                  https://google.com
                </span>{" "}
                ❌ <br />
                <span className="ml-8 italic text-sm">google.com</span> ❌
              </li>
            </ul>
          </div>
        </div>
        <Toast {...toast} />
      </div>
      <footer className="text-center w-full border-t z-10 p-2 sticky bottom-0 bg-white">
        Made with 😴 by{" "}
        <a
          href="https://www.findcoder.io/u/amanksingh99"
          className="text-red-500 font-semibold"
        >
          Aman
        </a>
      </footer>
    </Fragment>
  );
}

export default App;
