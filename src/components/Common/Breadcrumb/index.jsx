import { React } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb as ReactstrapBreadcrumb, BreadcrumbItem as ReactstrapBreadcrumbItem } from 'reactstrap'
import { pathToPageName } from '../../../routes'
import { PropTypes } from 'prop-types';

const propTypes = {
    aliases: PropTypes.object,
}

const Breadcrumb = ({aliases}) => {
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, i, arr) => {
            let crumbDisplayName = aliases && aliases[crumb] ? aliases[crumb] : crumb;

            currentLink += `/${crumb}`

            if(arr.length - 1 === i) {
                return (
                    <ReactstrapBreadcrumbItem active>
                        {pathToPageName[currentLink] ? pathToPageName[currentLink] : crumbDisplayName}
                    </ReactstrapBreadcrumbItem>
                )
            }
            else {
                return (
                    <ReactstrapBreadcrumbItem>
                        <Link to={currentLink}>{pathToPageName[currentLink] ? pathToPageName[currentLink] : crumbDisplayName}</Link>
                    </ReactstrapBreadcrumbItem>
                )
            }
        })

    return (
        <ReactstrapBreadcrumb>
            {crumbs}
        </ReactstrapBreadcrumb>
    )
}

export default Breadcrumb;