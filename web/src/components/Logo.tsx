import { clsx } from 'clsx';

export const Logo = ({ isInStaticNav = true }) => {
  return (
    <div className={clsx(isInStaticNav ? 'px-6' : 'px-4', 'flex flex-shrink-0 items-center')}>
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500"
        alt="J1Support"
      />
    </div>
  );
};
