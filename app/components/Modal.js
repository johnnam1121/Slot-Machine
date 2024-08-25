import Image from "next/image";
import React from "react";

export default function Modal({ modalTitle, modalText, modalTextTwo, modalImage }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      <button
        className="p-4 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {modalTitle}
      </button>
      {showModal ? (
        <div>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto p-4">
            <div className="relative w-full max-w-lg mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none max-h-[90vh] overflow-y-auto">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalTitle}</h3>
                  <button
                    className="text-red-300 background-transparent uppercase float-right text-center align-center justify-center text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-10 py-2 max-h-[70vh] overflow-y-auto">
                  <p className="text-blueGray-500 text-lg leading-relaxed">{modalText}</p>
                  <p className="text-blueGray-500 text-lg leading-relaxed">{modalTextTwo}</p>
                  <Image className="mt-2" src={modalImage.src} width={350} height={350} alt="Modal Image" />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}
