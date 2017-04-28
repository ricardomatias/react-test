const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const Welcome = require('../../src/welcome');

describe('welcome', function() {

  it('should work', function() {
    var view = TestUtils.renderIntoDocument(
      <Welcome />
    );

    const component = shallowRenderer.getRenderOutput();

    console.log(component);
  });

});
