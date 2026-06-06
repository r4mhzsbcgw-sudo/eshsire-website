/** Blog-only editorial images — separate from homepage / factory / product assets */
export const blogEditorialImages = {
  factoryFloor: "/images/blog/editorial/01-industrial-factory-floor.jpg",
  machineryOperator: "/images/blog/editorial/02-factory-machinery-operator.jpg",
  qualityStation: "/images/blog/editorial/03-production-quality-station.jpg",
  warehouseRacks: "/images/blog/editorial/04-warehouse-pallet-racks.jpg",
  warehouseAisle: "/images/blog/editorial/05-warehouse-inventory-aisle.jpg",
  containerPort: "/images/blog/editorial/06-container-port-logistics.jpg",
  freightYard: "/images/blog/editorial/07-freight-yard-shipping.jpg",
  hotelInterior: "/images/blog/editorial/08-hotel-commercial-interior.jpg",
  officeInterior: "/images/blog/editorial/09-office-commercial-space.jpg",
  apartmentFloor: "/images/blog/editorial/10-apartment-wood-floor.jpg",
  modernInterior: "/images/blog/editorial/11-modern-interior-flooring.jpg",
  designShowroom: "/images/blog/editorial/12-interior-design-showroom.jpg",
  distributionCenter: "/images/blog/editorial/13-distribution-center.jpg",
} as const;

export type BlogEditorialImageKey = keyof typeof blogEditorialImages;

export const BLOG_EDITORIAL_PREFIX = "/images/blog/editorial/";
