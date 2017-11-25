class AddInventory < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :inventory, :string
  end
end
