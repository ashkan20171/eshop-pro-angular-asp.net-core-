import {environment} from '../../environments/environment';

export const DomainName = environment.production ? 'https://toplearn.com' : 'https://localhost:44381';
export const ImagePath = DomainName + '/images/products/origin/';
export const ImageGalleryPath = DomainName + '/images/product-galleries/';
