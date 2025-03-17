function UploadButton({ setSelectedFiles }) {
  const handleFileChange = (files) => {
    const fileArray = Array.from(files); // Convert FileList to an array
    setSelectedFiles(fileArray);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    handleFileChange(droppedFiles);
  };

  return (
    <div
      className="w-full flex items-center justify-center h-28 bg-gray-100 rounded-lg cursor-pointer border-2 border-gray-300 my-4 shadow-md"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple // Allow multiple file selection
        onChange={(e) => handleFileChange(e.target.files)}
        hidden
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#475467"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-download"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />
            <path d="M12 13l0 9" />
            <path d="M9 19l3 3l3 -3" />
          </svg>
        </div>
        <div className="flex flex-row space-x-2">
          <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#A3346B] to-[#632C61]">
            Click to upload
          </p>
          <p className="text-sm text-gray-500 text-center">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-400 text-center">
          python, javascript, java, c#, cpp, typescript, php, ruby, kotlin
        </p>
      </div>
    </div>
  );
}

export default UploadButton;
