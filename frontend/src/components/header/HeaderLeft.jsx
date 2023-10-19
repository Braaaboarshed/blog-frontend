const HeaderLeft = ({toggle ,setToggle}) => {
    return (
        <div className="header-left">
    <div className="header-logo">
            <strong>BLOG</strong>
            <i class="bi bi-person-bounding-box"></i>
    </div>
    <div className="header-menu" onClick={()=>setToggle(prev=> !prev)}>
      { toggle? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
    </div>
  </div>
      );
}
 
export default HeaderLeft;