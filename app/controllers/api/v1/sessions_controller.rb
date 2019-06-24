class Api::V1::SessionsController < ApplicationController
  #prepend_before_action :require_no_authentication, only: [:create]
  before_action :ensure_params_exist, only: :create
  respond_to :json

  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.valid_password?(params[:user][:password])
        render json: payload(user)
    else
        render json: {"error": "invalid email and password combination"}
    end
  end

  def destroy
    sign_out(resource_name)
  end

  protected
  def ensure_params_exist
    return unless params[:user].blank?
    render json: {success: false, message: "missing user_login parameter"}, status: 422
  end

  def invalid_login_attempt
    warden.custom_failure!
    render json: {success: false, message: "Error with your login or password"}, status: 401
  end
end
