class CreateBuildings < ActiveRecord::Migration[5.1]
  def change
    create_table :buildings do |t|
      t.string :owner
      t.string :type
      t.string :count

      t.timestamps
    end
  end
end
