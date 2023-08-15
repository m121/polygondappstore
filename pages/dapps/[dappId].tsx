import { DAppRegistryApi, Dapp } from "@merokudao/storekit-sdk";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DappPage() {
  // Get the dApp ID from the URL using Next router.
  const router = useRouter();
  const { dappId } = router.query;

  const [dapp, setDapp] = useState<Dapp>();

  // useEffect to fetch the list of dApps and store them in the state
  useEffect(() => {
    (async () => {
      if (!dappId) return;

      // Base URL for the mainnet API
      const baseURL = "https://api-a.meroku.store";

      // Instantiate the dApp Registry API
      const dAppRegistryAPI = new DAppRegistryApi({
        basePath: baseURL,
      });

      // Get dApp info by ID
      const response = await dAppRegistryAPI.apiV1DappSearchDappIdGet(
        dappId as string
      );

      // Get the dApp out of the response
      const result = response?.data?.data?.[0];

      // Store the dApp in the state
      setDapp(result);
    })();
  }, [dappId]);

  // Render dApp information
  return (
    <main className=" flex flex-col align-middle w-full min-h-screen py-2 pt-20 bg-gray-800">
      <div className="bg-gray-900">
        <div className=" rounded-lg shadow-lg">
          <div className="bg-gray-900 p-4 flex flex-col rounded-lg shadow-lg  ">
            <img
              src={dapp?.images?.logo?.toString() || ""}
              alt={dapp?.name}
              className=" rounded-lg  mx-auto   "
            />
            <div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-[#9e9fae] mt-4 ">{dapp?.name}</p>

                <p className=" mt-4 ml-6 border-2 border-[#9e9fae] border-opacity-60 rounded-md p-2 text-green-600">
                  {dapp?.category.toLocaleUpperCase()}
                </p>
              </div>
              <p className="text-[#9e9fae] mt-4  ">{dapp?.description}</p>
              <div className="mt-8 ">
                <p className="text-[#9e9fae]">Language</p>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="text-md text-green-600 ">{dapp?.language}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-2 px-4">
                {dapp?.images?.screenshots?.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot.toString()}
                    alt={dapp.name}
                    className="w-1/4 p-2"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
