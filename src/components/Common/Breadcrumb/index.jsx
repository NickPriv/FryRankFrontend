import { React } from 'react'
import { useLocation } from 'react-router-dom'
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
            if(aliases && aliases[crumb]) {
                crumb = aliases[crumb]
            }

            currentLink += `/${crumb}`

            if(arr.length - 1 === i) {
                return (
                    <ReactstrapBreadcrumbItem active>
                        {pathToPageName[currentLink] ? pathToPageName[currentLink] : crumb}
                    </ReactstrapBreadcrumbItem>
                )
            }
            else {
                return (
                    <ReactstrapBreadcrumbItem>
                        <a href={currentLink}>{pathToPageName[currentLink] ? pathToPageName[currentLink] : crumb}</a>
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