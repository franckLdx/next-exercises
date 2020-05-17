export const launchesSegment = '/launches';
export const rocketsSegment = '/rockets';
export const shipsSegment = '/ships';
export const aboutSegment = '/about';

export const getLaunchesUrl = (pageNumber = 1) => `${launchesSegment}?${getPageNumber(pageNumber)}`;

export const getLaunchUrl = (launchId: string) => `${launchesSegment}/${launchId}`;

export const getRocketsUrl = () => rocketsSegment;

export const getRocketUrl = (rocketId: string) => `${rocketsSegment}/${rocketId}`;

export const getShipsUrl = (pageNumber = 1) => `${shipsSegment}?${getPageNumber(pageNumber)}`;

export const getShipUrl = (shipId: number) => `${shipsSegment}/${shipId}`;

export const getAboutUrl = () => aboutSegment;

const rocketsImage: Record<string, string> = {
  falcon1: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Falcon_1_Flight_4_liftoff.jpg",
  falcon9: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SpX_CRS-2_launch_-_further_-_cropped.jpg/1200px-SpX_CRS-2_launch_-_further_-_cropped.jpg",
  falconheavy: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/KSC-20190624-PH_KLS01_0056.jpg/1200px-KSC-20190624-PH_KLS01_0056.jpg",
  starship: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Starship_2019.png/1200px-Starship_2019.png"
}
export const getRocketsImage = (rocketId: string) => rocketsImage[rocketId];

const getPageNumber = pageNumber => `page=${pageNumber}`;