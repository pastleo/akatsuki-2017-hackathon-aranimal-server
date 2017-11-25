require 'test_helper'

class ScenesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scene = scenes(:one)
  end

  test "should get index" do
    get scenes_url, as: :json
    assert_response :success
  end

  test "should create scene" do
    assert_difference('Scene.count') do
      post scenes_url, params: { scene: { contents: @scene.contents, owner: @scene.owner, screenshot: @scene.screenshot } }, as: :json
    end

    assert_response 201
  end

  test "should show scene" do
    get scene_url(@scene), as: :json
    assert_response :success
  end

  test "should update scene" do
    patch scene_url(@scene), params: { scene: { contents: @scene.contents, owner: @scene.owner, screenshot: @scene.screenshot } }, as: :json
    assert_response 200
  end

  test "should destroy scene" do
    assert_difference('Scene.count', -1) do
      delete scene_url(@scene), as: :json
    end

    assert_response 204
  end
end
