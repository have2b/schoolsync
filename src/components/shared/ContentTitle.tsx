export const ContentTitle = (props: { title: string }) => {
  return (
    <div>
      <span className="relative text-2xl font-semibold underline-offset-2">
        <span className="relative z-10">{props.title}</span>
        <span className="absolute bottom-0 left-0 h-[2px] w-1/3 bg-current"></span>
      </span>
    </div>
  );
};
