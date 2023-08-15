import { useEffect, useState } from "react";
import { DAppRegistryApi, Dapp } from "@merokudao/storekit-sdk";
import Link from "next/link";

const HomeComponent = () => {
  // State to store the list of dApps
  const [dapps, setDapps] = useState<Dapp[]>();

  // useEffect to fetch the list of dApps and store them in the state
  useEffect(() => {
    (async () => {
      // Base URL for the mainnet API
      const baseURL = "https://api-a.meroku.store";

      // Instantiate the dApp Registry API
      const dAppRegistryAPI = new DAppRegistryApi({
        basePath: baseURL,
      });

      // Get the dApps list, and store it in the state
      const dAppsRequest = await dAppRegistryAPI.getDAppV1();
      const dApps = dAppsRequest.data.response;
      console.log(dAppsRequest.data.response);
      setDapps(dApps);
    })();
  }, []);

  // Display each dApp we stored in state
  return (
    <div>
      <div className="flex flex-row">
        <h3 className="title-font sm:text-4xl text-3xl text-center sm:mx-auto  font-semibold text-white mb-6 ml-2  ">
          Trending Dapps
        </h3>
      </div>

      <div className="grid sm:grid-cols-3 grid-cols-1 md:grid-cols-3 gap-4  px-2">
        {dapps?.map((dapp) => (
          <Link href={`/dapps/${dapp.dappId}`} key={dapp.dappId}>
            <div key={dapp.dappId} className=" rounded-lg shadow-lg">
              <div
                className="bg-gray-900 p-4 flex flex-col rounded-lg shadow-lg  "
                key={dapp.dappId}
              >
                <img
                  src={dapp.images?.logo?.toString() || ""}
                  alt={dapp.name}
                  className=" rounded-lg  mx-auto w-24  "
                />
                <div>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-[#9e9fae] mt-4 ">{dapp.name}</p>

                    <p className=" mt-4 ml-6 border-2 border-[#9e9fae] border-opacity-60 rounded-md p-2 text-green-600">
                      {dapp.category}
                    </p>
                  </div>
                  <p className="text-[#9e9fae] mt-4  h-48 ">
                    {dapp.description}
                  </p>
                  <div className="mt-8 ">
                    <p className="text-[#9e9fae]">Language</p>
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <p className="text-md text-green-600 ">
                          {dapp.language}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
