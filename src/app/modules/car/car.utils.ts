const convertToHours = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
};

const calculateTimeDifferenceInHours = (
  pickUpDate: string,
  pickUpTime: string,
  dropOffDate: string,
  dropOffTime: string
): number => {
  const pickUpDateTime = combineDateTime(pickUpDate, pickUpTime);
  const dropOffDateTime = combineDateTime(dropOffDate, dropOffTime);

  const timeDifferenceInMs =
    dropOffDateTime.getTime() - pickUpDateTime.getTime();
  const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);

  return timeDifferenceInHours;
};
