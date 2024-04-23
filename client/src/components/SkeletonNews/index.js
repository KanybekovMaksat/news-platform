import ContentLoader from "react-content-loader";

export const SkeletonNewsItem = () => {
    return (
        <ContentLoader
            speed={2}
            width={'100%'}
            height={'24%'}
            viewBox="0 0 841 211"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="4" y="4" rx="0" ry="0" width="255" height="211"/>
            <rect x="820" y="4" rx="3" ry="3" width="20" height="20"/>
            <rect x="265" y="4" rx="3" ry="3" width="50%" height="15"/>
            <rect x="265" y="32" rx="3" ry="3" width="100%" height="15"/>
            <rect x="265" y="52" rx="3" ry="3" width="100%" height="15"/>
            <rect x="265" y="72" rx="3" ry="3" width="80%" height="15"/>
            <rect x="265" y="92" rx="3" ry="3" width="60%" height="15"/>
            <rect x="265" y="112" rx="3" ry="3" width="50%" height="15"/>
            <rect x="265" y="132" rx="3" ry="3" width="50%" height="15"/>
            <rect x="265" y="152" rx="0" ry="0" width="50" height="32"/>
        </ContentLoader>
    );
};
