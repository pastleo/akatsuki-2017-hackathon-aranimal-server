class CreateScenes < ActiveRecord::Migration[5.1]
  def change
    create_table :scenes do |t|
      t.string :owner
      t.string :contents
      t.string :screenshot

      t.timestamps
    end
  end
end
