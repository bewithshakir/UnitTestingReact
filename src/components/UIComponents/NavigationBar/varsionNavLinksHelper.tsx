import { Breadcrumbs, Link } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './HorizontalBar.style.scss';
import { customerNavBar, taxesNavBar, truckNavBar } from './config';

export function versionBreadcrumbsSingle (getHeaderText: any, handleClick: any) {
  return (
    <>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label='breadcrumb'>
        <Link className='breadcrubs-title' href='#' onClick={handleClick}>
          {getHeaderText()}
        </Link>
      </Breadcrumbs>
    </>
  );
}

export const renderCutomerPagesHeader = (pathname: string, handleClick: any) => (
  customerNavBar.map((cObj: any, index: number) => (
    <div key={index} className={checkPath(index === 0 ? pathname === "/" : pathname.includes(cObj.to))}>
      <NavLink className='breadcrubs-title' to={cObj.to} onClick={handleClick}>
        {cObj.label}
      </NavLink>
    </div>
  ))
);

export const renderNavHeader = (list: any, pathname: string, handleClick: any, t: any) => (
  list.map((tObj: any, index: number) => (
    <div key={index} className={pathname.includes(tObj.to) ? 'linkitem active' : 'linkitem'}
    >
      <NavLink
        className='breadcrubs-title'
        to={tObj.to}
        onClick={handleClick}
      >
        {t(tObj.label)}
      </NavLink>
    </div>
  ))
);

const checkPath = (condition: boolean) => condition ? 'linkitem active' : 'linkitem';

export function varsionNavLinks (pathname: any, handleClick: any, t: any) {
  if (pathname.includes('taxes') || pathname.includes('salesTax') || pathname.includes('productManagement') ||
    pathname.includes('opisCities') || pathname.includes('assetManagement') || pathname.includes('vehicleRule')
  ) {
    return renderNavHeader(taxesNavBar, pathname, handleClick, t);
  }
  else if (pathname.includes('trucks') || pathname.includes('truckParkingLot')) {
    return renderNavHeader(truckNavBar, pathname, handleClick, t);
  } else {
    return renderCutomerPagesHeader(pathname, handleClick);
  }
}

export function versionBreadcrumbsMany (selectedCustomerName: string, getHeaderText: any) {
  return (
    <>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label='breadcrumb'>
        <Link className='breadcrubs-title'>
          {selectedCustomerName}
        </Link>
        <Link className="breadcrubs-title" href="#" onClick={(event) => event.preventDefault()} >
          {getHeaderText()}
        </Link>
      </Breadcrumbs>
    </>
  );
}