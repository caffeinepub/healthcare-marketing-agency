import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type Lead = {
    businessName : Text;
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    challenge : Text;
    timestamp : Int;
  };

  let leads = List.empty<Lead>();

  public shared ({ caller }) func submitLead(
    businessName : Text,
    name : Text,
    phone : Text,
    email : Text,
    city : Text,
    challenge : Text,
    timestamp : Int,
  ) : async () {
    let newLead : Lead = {
      businessName;
      name;
      phone;
      email;
      city;
      challenge;
      timestamp;
    };
    leads.add(newLead);
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leads.toArray();
  };

  public query ({ caller }) func getLeadCount() : async Nat {
    leads.size();
  };
};
