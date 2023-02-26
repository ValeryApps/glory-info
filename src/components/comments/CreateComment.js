import { IoSend } from "react-icons/io5";

export const CreateComment = ({
  submitComment,
  text,
  setText,
  commentLoading,
}) => {
  return (
    <div className="flex items-center gap-5 mx-3">
      <textarea
        name=""
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment"
        className="w-full rounded-md px-3 max-w-[80%] pt-1 text-md bg-gray300 focus:bg-white mt-3"
      ></textarea>
      {text?.trim() && (
        <div>
          {!commentLoading ? (
            <div className="cursor-pointer" onClick={submitComment}>
              <IoSend size={20} color="green" />
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      )}
    </div>
  );
};
