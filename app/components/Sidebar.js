import React from 'react';

const Sidebar = (props) => {
  const deselectCampus = props.deselect;

	return (
		<sidebar>
          <img src="campus.svg" className="logo" />
          <section>
            <h4 className="menu-item active">
              <a href="#" onClick={deselectCampus}>CAMPUSES</a>
            </h4>
          </section>
        </sidebar>
	)
}

export default Sidebar