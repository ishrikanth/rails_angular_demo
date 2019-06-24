class Api::V1::RegistrationsController < ApplicationController
  respond_to :json
  def create
    user = User.new(user_params)
    if user.save
      render json:  payload(user), :status=>201
    else
      warden.custom_failure!
      render json: user.errors, :status=>422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email,:password,:password_confirmation)
  end
end
