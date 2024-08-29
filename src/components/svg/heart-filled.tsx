import { useSiteContext } from '@src/context/site-context';
import { COLOR_CLASSES, Icon } from './index';
import { Settings } from '@src/models/settings';

export const HeartFilledIcon = ({ fillColor, color, className, strokeColor }: Icon) => {
  const { settings } = useSiteContext();
  const { store } = settings as Settings;

  if (store?.url?.includes('byronbaycandles')) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
        fill="none"
        className={`inline-block ${className}`}
      >
        <path
          fill={fillColor}
          stroke={strokeColor}
          d="M9.59033 1.80859C8.53449 1.80859 7.58949 2.32193 7.00033 3.10943C6.41116 2.32193 5.46616 1.80859 4.41033 1.80859C2.61949 1.80859 1.16699 3.26693 1.16699 5.06943C1.16699 5.76359 1.27783 6.40526 1.47033 7.00026C2.39199 9.91693 5.23283 11.6611 6.63866 12.1394C6.83699 12.2094 7.16366 12.2094 7.36199 12.1394C8.76783 11.6611 11.6087 9.91693 12.5303 7.00026C12.7228 6.40526 12.8337 5.76359 12.8337 5.06943C12.8337 3.26693 11.3812 1.80859 9.59033 1.80859Z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`inline-block ${className} ${COLOR_CLASSES[color]}`}
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: fillColor }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={fillColor}
        stroke={strokeColor}
        d="M1.98433 2.83296C0.176447 4.64085 0.176447 7.572 1.98433 9.37989L9.88722 17.2828L17.79 9.37989C19.5979 7.572 19.5979 4.64085 17.79 2.83296C15.9821 1.02508 13.051 1.02508 11.2431 2.83296L9.88722 4.18893L8.53126 2.83296C6.72337 1.02508 3.79221 1.02508 1.98433 2.83296Z"
      />
    </svg>
  );
};

HeartFilledIcon.defaultProps = {
  color: 'default',
  size: 'sm',
};
