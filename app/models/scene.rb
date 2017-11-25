class Scene < ApplicationRecord
  mount_base64_uploader :screenshot, ScreenshotUploader
end
