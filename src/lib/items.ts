export default function getItems(pathname : String) {
const items = [
...(pathname.slice(0,16) === '/Getting-started' ? [
  {
    "title": "Getting started",
    "url": "/Getting-started/Getting-started",
    "icon": null
  },
  {
    "title": "Important terms in FRC",
    "url": "/Getting-started/Important-terms-in-FRC",
    "icon": null
  }
] : []),
...(pathname.slice(0,9) === '/Phoenix6' ? [
  {
    "title": "Phoenix6",
    "url": "/Phoenix6",
    "icon": null
  }
] : []),
...(pathname.slice(0,13) === '/PhotonVision' ? [
  {
    "title": "Pose Estimator",
    "url": "/PhotonVision/Pose-Estimator",
    "icon": null
  }
] : []),
];
return items;
}